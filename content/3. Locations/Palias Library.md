---
name: Palias Library
parent_location: "[[Palias]]"
tags:
  - location
  - both-parties
---
## Description
A small, quaint little library in palias. 

## key info


### Sub-Locations
```base
views:
  - type: table
    name: Sub-Locations
    filters:
      and:
        - file.hasTag("location")
        - note["parent_location"] == this.file
    order:
      - file.name
    sort:
      - property: file.name
        direction: DESC

```