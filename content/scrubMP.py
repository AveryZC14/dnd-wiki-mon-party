import os
import re

# Configuration
REPLACE_MAP = {
    r'mp{': "<mp-exclusive>",
    r'}mp': "</mp-exclusive>" # Fixed your duplicate key issue
}

SCRUB_MARKERS = [
    (re.escape('kp{'), re.escape('}kp')), 
    (re.escape('dm{'), re.escape('}dm'))
]

REQUIRED_TAGS = ["both-parties", "mon-party"]

def clean_vault():
    # Walk the content directory
    for root, dirs, files in os.walk("./"):
        if "public-page" in root or ".git" in root:
            continue
        for file in files:
            if not file.endswith(".md"):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()

            # --- PHASE 1: Property/Tag Check ---
            content_str = "".join(lines)
            # Find the YAML block (between the first two ---)
            frontmatter_match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content_str, re.DOTALL)
            
            if not frontmatter_match:
                os.remove(path) # No frontmatter? Delete for safety.
                continue

            yaml_block = frontmatter_match.group(1)
            # Extract tags (handles both inline: [tag1, tag2] and bulleted lists)
            tags = re.findall(r'-\s+([^\s\n]+)', yaml_block) 
            # Check if at least one required tag exists
            if not any(tag in REQUIRED_TAGS for tag in tags):
                os.remove(path)
                continue

            # --- PHASE 2: Scrubbing and Replacing ---
            new_lines = []
            skip_block = False
            
            # Create a combined regex for scrub starts and ends
            scrub_starts = [pair[0] for pair in SCRUB_MARKERS]
            scrub_ends = [pair[1] for pair in SCRUB_MARKERS]

            for line in lines:
                # 1. Check for Scrub Markers (State Machine)
                if any(re.search(start, line) for start in scrub_starts):
                    skip_block = True
                    continue
                if any(re.search(end, line) for end in scrub_ends):
                    skip_block = False
                    continue
                
                if skip_block:
                    continue

                # 2. Handle Simple Replacements
                processed_line = line
                for pattern, replacement in REPLACE_MAP.items():
                    processed_line = re.sub(re.escape(pattern), replacement, processed_line)
                
                new_lines.append(processed_line)

            # --- PHASE 3: Write Back ---
            with open(path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)

if __name__ == "__main__":
    clean_vault()
    
#