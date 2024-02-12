import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
def calculate(cat, bud):
# Load dataset
    df = pd.read_csv('data.csv')

# Convert 'Median Household Income' to numeric, setting errors='coerce' to convert non-numeric values to NaN
    df['Median Household Income'] = pd.to_numeric(df['Median Household Income'], errors='coerce')

# Now you can safely compute the median without encountering the conversion error
# Fill NaN values in 'Median Household Income' with the median of the column
    median_income = df['Median Household Income'].median()
    df['Median Household Income'].fillna(median_income, inplace=True)

# Proceed with the rest of your data normalization and preparation steps
# Normalize 'Population Density' as previously shown
    max_density = df['Population Density'].max()
    min_density = df['Population Density'].min()
    df['Normalized Population Density'] = (df['Population Density'] - min_density) / (max_density - min_density)

# Normalize 'Median Household Income' now that it's correctly processed
    max_income = df['Median Household Income'].max()
    min_income = df['Median Household Income'].min()
    df['Normalized Median Income'] = (df['Median Household Income'] - min_income) / (max_income - min_income)

# Assuming 'Area Desirability' is a target variable you want to predict
# For simplicity, let's categorize 'Normalized Median Income' into 'Low', 'Medium', 'High'
    df['Area Desirability'] = pd.cut(df['Normalized Median Income'], bins=3, labels=['Low', 'Medium', 'High'])

# Encode categorical variables
    label_encoder = LabelEncoder()
    df['Simplified Category Encoded'] = label_encoder.fit_transform(df['Simplified Category'])

# Features and Target Variable
    X = df[['Normalized Median Income', 'Normalized Population Density', 'Simplified Category Encoded']]
    y = df['Area Desirability']

# Splitting dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Decision Tree Classifier
    decision_tree = DecisionTreeClassifier(random_state=42)
    decision_tree.fit(X_train, y_train)

# Model Evaluation
    predictions = decision_tree.predict(X_test)
    print(classification_report(y_test, predictions))

# User Interaction for Recommendations
    print("\nAvailable Restaurant Types:")
    for i, category in enumerate(df['Simplified Category'].unique(), start=1):
        print(f"{i}. {category}")
    
    category_selection = int(input("Select the number corresponding to your restaurant type: ")) - 1
    user_restaurant_type = df['Simplified Category'].unique()[category_selection]

    user_budget = int(input("Enter your budget (e.g., 250000): "))

# Normalize and encode user inputs
    normalized_user_budget = (user_budget - min_income) / (max_income - min_income)
    user_category_encoded = label_encoder.transform([user_restaurant_type])[0]

# Generate recommendations based on user input
    user_input_features = [[normalized_user_budget, 0.5, user_category_encoded]]  # Example with average population density
    predicted_desirability = decision_tree.predict(user_input_features)
    print(f"\nPredicted Area Desirability for a {user_restaurant_type} restaurant with a budget of {user_budget}: {predicted_desirability[0]}")

# Get top 5 ZIP codes for the recommended restaurant type and budget
    filtered_df = df[(df['Simplified Category'] == user_restaurant_type) & (df['Avg Real Estate Price'] <= user_budget)]
# Filter out ZIP codes with more than 3 similar restaurants
    filtered_df = filtered_df.groupby('ZIP Code').filter(lambda x: len(x) <= 3)
    if not filtered_df.empty:
        filtered_df = filtered_df.sample(n=min(5, len(filtered_df)))  # Sample to ensure at most 5 rows
        for index, row in filtered_df.iterrows():
            print(f"\nZIP Code: {row['ZIP Code']}, Neighborhood: {row['Neighborhood']}")
            print("Other Restaurants in this area:")
            area_restaurants = df[(df['ZIP Code'] == row['ZIP Code']) & (df['Simplified Category'] == user_restaurant_type) & (df['name'] != row['name'])]
            for _, restaurant_row in area_restaurants.iterrows():
                print(f"Name: {restaurant_row['name']}")
                print(f"Category: {restaurant_row['Simplified Category']}")
                print(f"Population Density: {restaurant_row['Population Density']}")
                print(f"Median Household Income: {restaurant_row['Median Household Income']}")
    else:
        print("No matching")
    return [len(area_restaurants), median_income, max_density]