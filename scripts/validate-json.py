#!/usr/bin/env python3

import os
import json
import sys
from pathlib import Path


global errors_found, current_json

errors_found = False

# debug = False
debug = True

def main():
    json_validate_all_files()

    if errors_found:
        sys.exit("Invalid schema - tests not passed - see log above for details")
    else:
        print("All files are valid")
        sys.exit(0)

# This should be cleaned up a bit more, it's somewhat fragile now
def get_project_root():
    path = os.path.abspath(os.getcwd() + "/api/propers")
    if debug:
        print("Looking for json files in " + path)
    return path

def get_all_files():
    return Path(get_project_root()).glob('**/*.json')

def lint_file_by_path(path):
    global errors_found, current_json

    # 1) check for valid json schema
    if not is_valid_json(path):
        print("INVALID JSON file: " + path)
        errors_found = True
    elif debug:
        print("VALID JSON: " + path)

    # 2.1) Check global schema rules
    keysToCheck = [
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

    for key in keysToCheck:
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

def json_validate_all_files():

    for path in get_all_files():
        lint_file_by_path(str(path));


main()
