## Description:

This project is a web application designed to visualize and analyze epidemiological data, focusing on disease reporting and outbreak patterns. By leveraging the capabilities of big data technologies and advanced statistical techniques, this application aims to enhance the understanding and management of public health trends. The project showcases an integration of frontend technologies such as React JS, HTML, and CSS with backend processing in PySpark and Python, demonstrating a comprehensive skill set in both data analysis and web development.

## Why This Project Matters:

Understanding where and how diseases spread is key to stopping them. For example, knowing where the flu is most likely to hit helps get vaccines to the right places at the right time. This project helps public health officials make smart decisions to keep people healthy.

## Inspiration: 

Inspired by the potential of statistical techniques like hypothesis testing, regression, and dimensionality reduction techniques like PCA in addressing real-world challenges, this project aims to apply these methods to public health data. It serves as a platform to exhibit proficiency in web development and data analysis, illustrating how they can be combined to create accessible and impactful public health tools.

## Data Source:

The data utilized in this project is sourced from the Centers for Disease Control and Prevention (CDC), ensuring high reliability and accuracy for the analysis. My project is committed to providing meaningful insights based on trustworthy data.

## Data Preparation and Exploratory Data Analysis (EDA) Overview:

This section outlines the methodology applied from data loading to advanced analytical insights, providing clarity on the dataset's exploration and preparation for further analysis.

#### Data Preprocessing

Objective: Identify and clean missing or irrelevant data to improve analysis accuracy.
Methods:
1. Calculated zero, negative, empty, and null value counts for each column to assess data quality.

2. Applied conditional transformations to replace missing or irrelevant values (e.g., nulls in 'Current week' replaced with -1, and flags in certain columns standardized).
   
3.Removed unnecessary columns (e.g., 'geocode', 'LOCATION1') to focus the dataset on relevant information.

4. Ensured numerical consistency by replacing nulls with 0 in cumulative year-to-date columns.


#### Exploratory Data Analysis (EDA)

Distribution Analysis: I created a histogram to visualize the distribution of cases reported in the current week, identifying common case count ranges and outliers.

Aggregated Analysis: I conducted grouped analyses by 'Label' to calculate average and maximum case counts, highlighting diseases with significant impacts.

Frequency Analysis: I added a 'Total Cases' column to sum cumulative year-to-date cases for the current and previous years. Performed frequency analysis to identify diseases and areas with the highest case counts, offering insights into disease prevalence and geographical hotspots.

Geospatial Analysis: I integrated external shapefiles for geospatial visualization, mapping total cases by reporting area. This analysis provided a visual representation of disease distribution across different regions, enhancing the understanding of geographical patterns in disease outbreaks.

## Features:

Data Analysis and Visualization: Utilizes PySpark for in-depth analysis and Python with libraries such as geopandas for mapping disease outbreaks. The application visualizes these analyses through interactive dashboards developed with React JS, Plotly JavaScript, and other web technologies.

Advanced Statistical Techniques: Employs machine learning algorithms such as Random Forest and Gradient Boosted Trees usign PySpark's MLlib to forecast future disease outbreaks and their potential impact, leveraging historical data patterns. ( These models are chosen for their ability to handle complex datasets and provide accurate predictions.)

Web Application: A user-friendly frontend developed with React JS, HTML, and CSS showcases the data visualizations and allows for intuitive interaction with the analysis results.

## Results:

The following is a screenshot of the frequency tab of my website. It showcases the most frequent diseases in different regions of the United States, complete with case numbers. For example, it lists Salmonellosis as the most frequent disease in one state with over 8,000 reported instances. This tool can be used to track and analyze disease prevalence for monitoring public health.

![frequency](https://github.com/shaunthom/Outbreak-Analytics-PySpark/assets/134566032/5822508e-76f5-4f23-ad36-fe54b0f7b778)


The next screenshot shows a feature of a web application that provides health profiles for individual states, in this case, Alaska. The health profile includes a list of the top diseases for the year 2022, offering a quick reference to public health data and disease prevalence within the state. These state cards are designed to inform users about the most common health concerns and the number of cases reported, which can be essential for public health planning, resource allocation, and disease prevention efforts. The states can be navigated using the left and right button as well.

![Data](https://github.com/shaunthom/Outbreak-Analytics-PySpark/assets/134566032/cab5ca3f-2596-497b-948b-a965cc8bedbc)


## Future Enhancements:

I have plans to include integrating a backend system for automatic data updates to keep the application current with minimal manual intervention. Stay tuned!

## Contributing:

Contributions to improve the functionality or efficiency of the code are welcome. Please follow the standard GitHub pull request process.
