from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("NNDSSDataAnalysis") \
    .getOrCreate()

# Data Loading:

df = spark.read.csv("Desktop/Datasets/NNDSS_Weekly_Data.csv", header=True, inferSchema=True)
df.printSchema()
df.show(n=5)


# Data Preprocessing:

from pyspark.sql.functions import col, count, when
zero_neg_empty_null_counts = {}

for col_name in df.columns:
    zero_neg_empty_null_counts[col_name] = df.select(
        count(when((col(col_name) == 0) | (col(col_name) == "-") | (col(col_name) == "") | col(col_name).isNull(), col_name))
    ).collect()[0][0]

total_rows = df.count()

print("Zero, Negative, Empty, and Null Counts per Column:", zero_neg_empty_null_counts)
print("Total Number of Rows:", total_rows)

from pyspark.sql.functions import col
df = df.withColumn('Current week', when(col('Current week').isNull(), -1).otherwise(col('Current week')))

flag_cols = ['Current week, flag', 'Previous 52 weeks Max, flag', 'Cumulative YTD Current MMWR Year, flag', 'Cumulative YTD Previous MMWR Year, flag']

for col_name in flag_cols:
    df = df.withColumn(col_name, when(col(col_name) == '-', 1).otherwise(0))

df = df.drop('geocode', 'LOCATION1','LOCATION2','sort_order','Previous 52 week Max')    
df = df.withColumn('Cumulative YTD Current MMWR Year', when(col('Cumulative YTD Current MMWR Year').isNull(), 0).otherwise(col('Cumulative YTD Current MMWR Year')))
df = df.withColumn('Cumulative YTD Previous MMWR Year', when(col('Cumulative YTD Previous MMWR Year').isNull(), 0).otherwise(col('Cumulative YTD Previous MMWR Year')))

# Pre-processed Data Coming up:

df.show(n=50, truncate=False, vertical=True)
df.printSchema()

from pyspark.sql.functions import col

null_counts = {}
for col_name in df.columns:
    null_counts[col_name] = df.filter(col(col_name).isNull()).count()

for column, count in null_counts.items():
    print(f"Null count in {column}: {count}")


pandas_df = df.toPandas()
import matplotlib.pyplot as plt

pandas_df['Current week'].plot(kind='hist', bins=50, title='Distribution of Current Week Cases')
plt.xlabel('Number of Cases')
plt.ylabel('Frequency')
plt.show()

from pyspark.sql import functions as F
grouped_data = df.groupBy("Label").agg(
    F.avg("Current week").alias("Average Current Week"),
    F.max("Current week").alias("Max Current Week")
)
grouped_data.show()

# Correlation Matrix

from pyspark.ml.feature import StringIndexer, VectorAssembler
from pyspark.ml.stat import Correlation
from pyspark.sql.functions import when, col

indexer = StringIndexer(inputCol="Label", outputCol="Label_Index")
df_indexed = indexer.fit(df).transform(df)
numeric_cols = [t[0] for t in df_indexed.dtypes if t[1] in ['int', 'double']]
numeric_cols.append('Label_Index')

assembler = VectorAssembler(inputCols=numeric_cols, outputCol="features")
vector_df = assembler.transform(df_indexed)
correlation_matrix = Correlation.corr(vector_df, "features").head()
corr_df = spark.createDataFrame(correlation_matrix[0].toArray().tolist(), numeric_cols)
corr_df.show(truncate=False)


# Frequency Analysis
df = df.withColumn('Total Cases', col('Cumulative YTD Current MMWR Year') + col('Cumulative YTD Previous MMWR Year'))
disease_total_cases = df.groupBy("Label").sum("Total Cases")
frequency_disease = disease_total_cases.orderBy('sum(Total Cases)', ascending=False).show()
frequency_disease


df = df.filter((df['Reporting Area'] != 'TOTAL') & (df['Reporting Area'] != "US RESIDENTS"))
df = df.withColumn('Total Cases', col('Cumulative YTD Current MMWR Year') + col('Cumulative YTD Previous MMWR Year'))
area_total_cases = df.groupBy("Reporting Area").sum("Total Cases")

frequency_area = area_total_cases.orderBy('sum(Total Cases)', ascending=False).show()

## GEOSPATIAL ANALYSIS

area_total_cases_pd = area_total_cases.toPandas()
import geopandas as gpd

gdf = gpd.read_file('Desktop/Datasets/s_08mr23.shp')
gdf.head()

unique_reporting_areas = df.select("Reporting Area").distinct()

unique_reporting_area_list = unique_reporting_areas.collect()
for area in unique_reporting_area_list:
    print(area["Reporting Area"])

area_to_state_map = {
    "SOUTH ATLANTIC": "Florida", 
    "NEW JERSEY": "New Jersey",
    "NORTHERN MARIANA ISLANDS": "Northern Mariana Islands",
    "WISCONSIN": "Wisconsin",
    "PENNSYLVANIA": "Pennsylvania",
    "ILLINOIS": "Illinois",
    "DISTRICT OF COLUMBIA": "District of Columbia",
    "MARYLAND": "Maryland",
    "WEST VIRGINIA": "West Virginia",
    "MISSOURI": "Missouri",
    "IDAHO": "Idaho",
    "MONTANA": "Montana",
    "EAST SOUTH CENTRAL": "Tennessee",  
    "MICHIGAN": "Michigan",
    "FLORIDA": "Florida",
    "MIDDLE ATLANTIC": "New York", 
    "OREGON": "Oregon",
    "AMERICAN SAMOA": "American Samoa",
    "US TERRITORIES": "Guam",  
    "SOUTH DAKOTA": "South Dakota",
    "LOUISIANA": "Louisiana",
    "ALASKA": "Alaska",
    "PUERTO RICO": "Puerto Rico",
    "NEW ENGLAND": "Massachusetts", 
    "MAINE": "Maine",
    "MOUNTAIN": "Colorado", 
    "NEW HAMPSHIRE": "New Hampshire",
    "OKLAHOMA": "Oklahoma",
    "VIRGINIA": "Virginia",
    "WASHINGTON": "Washington",
    "NORTH CAROLINA": "North Carolina",
    "WYOMING": "Wyoming",
    "WEST NORTH CENTRAL": "Minnesota", 
    "TEXAS": "Texas",
    "NEBRASKA": "Nebraska",
    "MINNESOTA": "Minnesota",
    "HAWAII": "Hawaii",
    "GUAM": "Guam",
    "RHODE ISLAND": "Rhode Island",
    "WEST SOUTH CENTRAL": "Texas",  
    "EAST NORTH CENTRAL": "Illinois",  
    "MISSISSIPPI": "Mississippi",
    "TENNESSEE": "Tennessee",
    "COLORADO": "Colorado",
    "NEVADA": "Nevada",
    "VERMONT": "Vermont",
    "U.S. VIRGIN ISLANDS": "Virgin Islands",
    "NEW MEXICO": "New Mexico",
    "NEW YORK": "New York",
    "UTAH": "Utah",
    "CALIFORNIA": "California",
    "IOWA": "Iowa",
    "KANSAS": "Kansas",
    "ARIZONA": "Arizona",
    "KENTUCKY": "Kentucky",
    "NON-US RESIDENTS": "Guam", 
    "OHIO": "Ohio",
    "MASSACHUSETTS": "Massachusetts",
    "SOUTH CAROLINA": "South Carolina",
    "ALABAMA": "Alabama",
    "DELAWARE": "Delaware",
    "CONNECTICUT": "Connecticut",
    "NORTH DAKOTA": "North Dakota",
    "PACIFIC": "Hawaii", 
    "ARKANSAS": "Arkansas",
    "INDIANA": "Indiana",
    "NEW YORK CITY": "New York",
    "GEORGIA": "Georgia"
}

import pandas as pd


mapping_df = spark.createDataFrame(pd.DataFrame(list(area_to_state_map.items()), columns=['Reporting Area', 'Mapped Reporting Area']))
df_joined = df.join(mapping_df, on='Reporting Area', how='left')
area_total_cases = df_joined.groupBy('Mapped Reporting Area').sum('Total Cases')
area_total_cases_pd = area_total_cases.toPandas()

merged_gdf = gdf.set_index('NAME').join(area_total_cases_pd.set_index('Mapped Reporting Area'))

fig, ax = plt.subplots(1, 1, figsize=(15, 10))
merged_gdf.plot(column='sum(Total Cases)', ax=ax, legend=True, cmap='OrRd')  # Adjust the column name if necessary
plt.title('Total Cases by Reporting Area')
plt.show()
