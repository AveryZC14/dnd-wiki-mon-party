---
name: Valley's House
parent_location: "[[Palias]]"
tags:
  - location
  - mon-party
---
## Description
Valley's house. simple.
Houses [[Valley]]

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