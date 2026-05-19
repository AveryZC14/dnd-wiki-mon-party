---
name: Overworld
parent_location:
tags:
  - both-parties
  - location
---
#location #both-parties 
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
        direction: ASC

```
