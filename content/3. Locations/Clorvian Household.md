---
name: Clorvian Household
parent_location: "[[Palias]]"
tags:
  - location
  - both-parties
---
## Description
A Modest, large house.
Houses [[Cassius Clorvian]] and [[Dennis Clorvian]]

## key info
Has a large basement where ingredients are shipped in and Clorvie floor cleaner is made
The large basement has two large vats of some chemical, as well as a room to get potion ingredients teleported in. Potion orders are also packed there. Protected by a floor based puzzle with buzzsaws


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