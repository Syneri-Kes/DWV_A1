# Data Wrangling and Visualization: Highest-Grossing Films

**Student:** Ekaterina Baeva  
**Live Demo:** [https://syneri-kes.github.io/DWV_A1/](https://syneri-kes.github.io/DWV_A1/)

## Project Overview

This project implements a complete data pipeline: extracting real-world data from Wikipedia, cleaning and structuring it, storing it in a relational database, and finally presenting it through an interactive web interface hosted on GitHub Pages.

## File Descriptions

- **`index.html`** – The main HTML5 document that defines the structure of the web application, including the header, control buttons, and the container for film cards.

- **`style.css`** – CSS3 stylesheet that provides a modern, responsive layout for the web interface, including grid-based film cards and interactive button styling.

- **`script.js`** – JavaScript file that implements the core front-end logic. It uses the Fetch API to load the film data from `films_data.json` and provides interactive features such as dynamic sorting (by year or revenue) and filtering.

## Data Cleaning and JSON Correction

During the data wrangling phase, the raw data extracted from Wikipedia required significant cleaning, particularly for the `box_office` field. A unique parsing issue was encountered due to “overlinks” in the Wikipedia source—for example, values like `F8$1...` where `F8` was an internal reference link that interfered with numeric extraction.

To ensure that the revenue data remained purely numeric and valid for visualisation, the problematic entries were manually corrected in `films_data.json`. The following screenshots illustrate the difference between a standard Wikipedia link and the problematic overlink format that was fixed.

Standard reference links: 
NZ$2,215,690,000 |
SM$1,922,598,800

Problematic overlink: 
F8$1,238,764,765

These corrections guarantee that all box office figures are correctly parsed and displayed in the interactive gallery.

Additionally, some entries in the dataset may show `UNKNOWN` for the director and country fields. This occurs when the fetching process encountered an `Access Denied (403)` error while attempting to retrieve the corresponding data from the source. Such entries were preserved with placeholder values to maintain the integrity of the rest of the dataset.
