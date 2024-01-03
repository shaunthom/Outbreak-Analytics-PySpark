from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("NNDSSDataAnalysis") \
    .getOrCreate()

#Data Loading
df = spark.read.csv("Desktop/Datasets/NNDSS_Weekly_Data.csv", header=True, inferSchema=True)
df.printSchema()
df.show(n=5)


#Data Preprocessing
