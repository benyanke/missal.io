#!/usr/bin/env python3

import os
import json
import sys
from pathlib import Path


global errors_found

errors_found = False

debug = False


def main():
    json_validate_all_files()

    if errors_found:
        sys.exit("Invalid json")
    else:
        print("All files are valid JSON")
        sys.exit(0)

# This should be cleaned up a bit more, it's somewhat fragile now
def get_project_root():
    return os.path.abspath(os.getcwd())

def get_all_files():
    return Path(get_project_root()).glob('**/*.json')

def lint_file_by_path(path):
    global errors_found

    if not is_valid_json(path):
        print("INVALID JSON file: " + path)
        errors_found = True
    elif debug:
        print("VALID JSON: " + path)


def is_valid_json(path):
    file = open(path,'r')

    try:
        json_object = json.loads(file.read())
    except Exception as e:
        print(repr(e))
        return False
    return True

def json_validate_all_files():

    for path in get_all_files():
        lint_file_by_path(str(path));


main()
