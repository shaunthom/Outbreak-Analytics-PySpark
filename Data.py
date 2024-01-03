from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("NNDSSDataAnalysis") \
    .getOrCreate()

#Data Loading
df = spark.read.csv("Desktop/Datasets/NNDSS_Weekly_Data.csv", header=True, inferSchema=True)
df.printSchema()
df.show(n=5)


#Data Preprocessing

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

#Pre-processed Data Coming up:

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