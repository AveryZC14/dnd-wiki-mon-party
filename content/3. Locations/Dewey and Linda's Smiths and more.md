---
name: Dewey and Linda's Smiths and more
aliases:
  - Dewey and Linda's Shop
  - Shirelon Household
parent_location: "[[Palias]]"
tags:
  - location
  - both-parties
---
## Description
This location is a quaint little blacksmith warehouse/shop where [[Dewey Shirelon]] and [[Linda Shirelon]] reside and do their work. Linda is a blacksmith, and Dewey is an Artificer.

## key info
- Dewey and Linda are on good terms with the party, and will sell them magic items and the like.

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