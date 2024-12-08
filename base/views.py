from django.shortcuts import render
# Create your views here.
def login(request):
    return render(request, 'login.html')
def home(request):
    return render(request, 'home.html')
def map(request):
    return render(request, 'map.html')
def algorithum(request):
    return render(request, 'algorithum.html')
def project_summary(request):
    return render(request, 'project_summary.html')

import pandas as pd
import matplotlib.pyplot as plt
from django.shortcuts import render
import os

def visualize_data(request):
    # Path to the CSV file
    csv_path = os.path.join(os.path.dirname(__file__), 'static/base/predictions.csv')

    # Read CSV file
    data = pd.read_csv(csv_path)

    # Create graphs for each parameter
    graphs = []
    for col in data.columns:
        plt.figure()
        data[col].plot(kind='line', title=f'{col} Trend', legend=True)
        plt.xlabel('Index')
        plt.ylabel(col)
        graph_path = f'base/static/base/graphs/{col}.png'
        plt.savefig(graph_path)
        graphs.append(f'base/static/base/graphs/{col}.png')
        plt.close()

    # Render the template with the graph paths
    return render(request, 'templates/ml.html', {'graphs': graphs})
