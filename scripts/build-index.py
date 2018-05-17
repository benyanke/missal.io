#!/usr/bin/env python3

import os
import json
import sys
import json
from pathlib import Path


global errors_found, current_json

errors_found = False

debug = False

files = []

def main():
    global debug

    # Check if we should enable debug mode
    if ('debug' in os.environ) and os.environ['debug'] == 'true':
        debug = True

    create_index()


    if errors_found:
        sys.exit("Could not create index.")
    else:
        print("Index created successfully")
        sys.exit(0)

# This should be cleaned up a bit more, it's somewhat fragile now
def get_project_root():
    path = os.path.abspath(os.getcwd() + "/api/propers")
    if debug:
        print("Looking for json files in " + path)
    return path

def get_all_files():
    return Path(get_project_root()).glob('**/*.json')

def generate_line_entry(path):
    global errors_found, current_json

    # 1) check for valid json schema
    if not is_valid_json(path):
        print("INVALID JSON file: " + path)
        errors_found = True
    elif debug:
        print("VALID JSON: " + path)

    # Final output map
    out = {}

    filedir, filename = os.path.split(path)

    # Get attributes from file
    out['name'] = current_json['name']
    out['season'] = current_json['season']
    out['href'] = filedir.split("/")[-1] + "/" + filename
    out['season'] = current_json['season']

    if 'slug' in current_json:
        out['slug'] = current_json['season'] + "/" + slug
    else:
        out['slug'] = current_json['season'] + "/" + os.path.splitext(filename)[0]

    out['last-updated'] = int(os.path.getmtime(path))

    # This will be removed at some point but remains for API compatibility
    out['status'] = 'complete'

    # Remove this after sorting
    out['seasonsortkey'] = current_json['seasonSortKey']

    return out

    # TODO: sort by slug

    # TODO In validation after:
    # Ensure slugs are unique
    # 


    # 2.1) Check global schema rules
    requiredKeys = [
        'name',
        'compiledBy',
        'liturgyType',
        'liturgyClass',
        'season',
        'sourceName',
        'seasonSortKey',
        'sourceLink',
        'textblocks',
    ]

    for key in requiredKeys:
        if key in current_json:
            if debug:
                print("Key '" + key + "' found in " + path)
        else:
            print("Key '" + key + "' not found in " + path)
            errors_found = True

    if errors_found:
        return;

    # 2.2) Check schema rules on each text in textblock


    # listing of all the required keys for each textblock
    requiredKeys = [
        'type',
        'text',
    ]

    # listing of any optional keys - test will fail if key is found not on this list or list above
    # TODO: implement this check
    optionalKeys = [
        'citation',
        'heading',
    ]

    # listing of all valid languages
    # TODO: write checks for that
    validLangs = [
        'en',
        'la',
    ]

    # Listing of all valid textblock types
    # TODO: Write check
    validTypes = [
        'introit',
        'collect',
        'etc-addmore',
    ]

    # Validate text blocks
    for text in current_json['textblocks']:

        # Check required keys
        for key in requiredKeys:
            if key in text:
                if debug:
                    print("Required textblock key '" + key + "' found in " + path)
            else:
                print("Required textblock key '" + key + "' not found in " + path)
                errors_found = True

def is_valid_json(path):
    global current_json
    file = open(path,'r')

    try:
        json_object = json.loads(file.read())
        current_json = json_object
    except Exception as e:
        print(repr(e))
        return False
    return True

def create_index():

    # Main index structure
    index = json.loads('{"info": {"title": "MyMissal.io","hrefBase": "/api/propers/","showChant": false,"langOptions": [{"slug": "en","str": "english"},{"slug": "la","str": "latin"}]}}')

    textsList = []
    for path in get_all_files():
        textsList.append(generate_line_entry(str(path)));

    # Add texts
    index['texts'] = textsList;

    print(json.dumps(index, indent=4))


main()
