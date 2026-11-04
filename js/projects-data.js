/**
 * In-depth technical data for AI & Machine Learning Projects Showcase
 * Rendered dynamically when clicking on project cards or "View Deep Dive" buttons.
 */

const projectsData = {
  'customer-churn': {
    id: 'customer-churn',
    title: 'Customer Churn Prediction',
    category: 'Machine Learning',
    score: 'ROC-AUC: 0.9111',
    metricLabel: 'Model Discriminative Ability',
    image: 'assets/images/project-churn.svg',
    summary: 'Developed a Machine Learning classification model to predict customer churn and identify customers who are likely to leave a service.',
    problemStatement: `Subscription and telecom enterprises face substantial annual revenue churn. Acquiring a new customer costs 5x to 7x more than retaining an existing one. The core challenge was accurately predicting churn probability well before contract cancellation, allowing customer success teams to initiate proactive, personalized retention offers.`,
    solutionDescription: `Engineered an end-to-end Machine Learning classification pipeline using Scikit-learn. The workflow encompassed extensive Exploratory Data Analysis (EDA), automated handling of missing records, categorical one-hot encoding, and numerical feature scaling. To counter class imbalance, synthetic minority oversampling (SMOTE) was evaluated against class weighting. Multiple algorithms (Logistic Regression, Decision Trees, Random Forest, and Gradient Boosting) were benchmarked, with hyperparameter grid search optimizing the model to a high ROC-AUC score of 0.9111.`,
    keyHighlights: [
      'Attained a high ROC-AUC score of 0.9111, demonstrating superior discrimination between churning and loyal accounts.',
      'Identified top predictive churn drivers: Month-to-month contract type, Total Charges, and Account Tenure.',
      'Constructed precision-recall threshold calibration to minimize costly false negatives.',
      'Designed clean modular Python codebase ready for production inference.'
    ],
    technologies: [
      'Python',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Machine Learning',
      'Data Cleaning',
      'EDA',
      'Model Evaluation'
    ],
    githubUrl: 'https://github.com/ayamohy',
    demoUrl: 'https://github.com/ayamohy'
  },

  'car-damage': {
    id: 'car-damage',
    title: 'Car Damage Detection',
    category: 'Deep Learning / Computer Vision',
    score: '7-Class CNN Classifier',
    metricLabel: 'Multi-Class Damage Recognition',
    image: 'assets/images/project-car-damage.svg',
    summary: 'Developed a CNN-based image classification model to detect and classify different types of vehicle damage from uploaded images.',
    problemStatement: `Automotive insurance claims processing traditionally requires manual on-site physical appraisal, causing delays of several days and significant administrative overhead. An automated computer vision solution that immediately categorizes vehicle damage types from smartphone photos dramatically streamlines insurance estimation and triage.`,
    solutionDescription: `Architected and trained a multi-class Convolutional Neural Network (CNN) in TensorFlow and Keras capable of distinguishing 7 distinct damage categories. The pipeline utilized extensive data augmentation (rotation, shearing, horizontal flip, zoom) to prevent overfitting on complex real-world lighting conditions. Integrated the trained neural model into an interactive Streamlit web dashboard where users or adjusters upload vehicle photographs and receive real-time prediction probabilities and visual diagnostic overlays.`,
    keyHighlights: [
      'Accurate multi-class damage classification covering 7 granular damage patterns.',
      'Feature extraction with Conv2D layers, Max-Pooling, Batch Normalization, and Dropout regularization.',
      'Interactive Streamlit UI allowing instant single-click image upload and real-time inference in ~24ms.',
      'Automated confidence score sorting with highlighted primary damage class alerts.'
    ],
    classesDetected: [
      'Bumper Dent',
      'Bumper Scratch',
      'Door Dent',
      'Door Scratch',
      'Glass Shatter',
      'Head Lamp',
      'Tail Lamp'
    ],
    technologies: [
      'Python',
      'TensorFlow',
      'Keras',
      'Convolutional Neural Networks (CNN)',
      'Computer Vision',
      'Streamlit',
      'NumPy',
      'Google Colab'
    ],
    githubUrl: 'https://github.com/ayamohy',
    demoUrl: 'https://github.com/ayamohy'
  }
};

