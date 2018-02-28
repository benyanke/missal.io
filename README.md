# Missal.io

![build status of gh-pages branch](https://travis-ci.org/benyanke/missal.io.svg?branch=gh-pages)

## Goals
This is a backend data project designed to put the content of the 1962 (and older) Roman Missals
and the translations into a usable datastructure to be called as an api. 

The primary focus will always be the /api directory as a backend datasource for other projects,
there will also be a simple frontend app using the backend data as an example of what is possible.

This is currently available at http://missal.io.


## Builds
Currently, builds only verify that they are valid json. In the future, there are plans to ensure the
content is valid and linted as well. 

Example linting rules might include:
 * no trailing spaces at the end of a string
 * ensuring that non-optional fields are not blank

Additionally, the index should be created in the future by the builds process, and possibly even a static
HTML frontend based on the backend.



## Roadmap

 * Add unreformed holyweek - and find a good way to denote this in the datastructure (perhaps add a missal-edition tag)
 * Cleanup example app at missal.io - currently it does not handle non-standard liturgies well
