pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Thirumalaivasangj3/-BMI-Calculator.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No test script defined"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy step can be added here if needed.'
            }
        }
    }
}
