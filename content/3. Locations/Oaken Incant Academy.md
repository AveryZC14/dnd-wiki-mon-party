---
name: Oaken Incant Academy
parent_location:
tags:
  - location
  - both-parties
---
## Description
A large magic academy built into an oak tree. a huge oak tree. It has a massive library, and many classrooms and facilities. The sports facilities are abandoned and decrepit. the theatre is booming! 

## key info
- [[Hyacinth]] went there
- [[Laucian Grey]] went there too, but he dropped out to do blacksmithing (goodforhim)

## History


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