---
name: Palias
parent_location: "[[Overworld]]"
tags:
  - location
  - both-parties
---
#location #both-parties 
### Sub-Locations
```base
views:
  - type: table
    name: "Sub-Locations"
    filters:
      and:
        - file.hasTag("location")
        - note["parent_location"] == this.file
    order:
      - file.name
```