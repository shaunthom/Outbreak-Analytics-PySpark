import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Other Works</h2>
      
      <h3 className={styles.projectTitle}>Sports Data Analytics Application: AI Huddle                       <a href="https://github.com/shaunthom/Football_Analytics_Mobile_App" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /> </a></h3>
      
      <p>Under the guidance of Prof. Chunming Qiao, my team and I developed AI Huddle, a cutting-edge sports analytics application. AI Huddle tackles the high costs and inefficiencies of traditional sports analytics tools, making real-time insights accessible to high school and college sports teams. Our app, developed using React Native, Python, AWS technologies, and JavaScript, features a Fast API proxy layer with IP whitelisting to address our server's IP capacity limitations. Its unique functionality allows coaches to record their verbal comments and video snippets during games. These inputs are then transcribed and analyzed in real-time using speech-to-text and natural language processing technologies (spaCy), offering a comprehensive suite of statistics and qualitative assessments such as player matchups and game predictions. This innovative approach not only matches the capabilities of expensive platforms like HUDL but also provides these insights as events unfold on the field.</p>
      
      <h3 className={styles.projectTitle}>Genomic Data Structuring                      <a href="https://github.com/shaunthom/GenoParse-VCF-Data-Extraction-and-Analysis-Pipeline" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faGithub} /> </a></h3>
      
      <p>In this genetic project, I tackled the complexity of Variant Call Format (VCF) files by transforming genetic data into structured dictionary formats. This initiative enhances the usability of genetic information, paving the way for advanced statistical analysis in medical research. My approach simplified the data structure, standardizing and making it more accessible for computational processes, especially in machine learning. I converted details like chromosome number, variant position, and alleles from thousands of genetic variants into a standardized format. This transformation plays a crucial role in facilitating more effective data management and paves the way for significant discoveries in genomics and medical genetics.</p>
      
      <h3 className={styles.projectTitle}>Supply Chain Database Management System                       <a href="https://github.com/shaunthom/Supply-Chain-Database-System" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a></h3>
      
      <p>Our database management system project assisted inventory and resource management in supply chains. Utilizing Oracle Apex, my team and I designed a system capable of efficiently handling over 10,000 entries. The project's methodology was comprehensive, involving metadata analysis, cluster design, and the establishment of key interrelations, all visualized in an Entity-Relationship (ER) diagram. We further optimized the system by implementing normalization processes to eliminate database dependencies. This led to a streamlined, efficient database structure that significantly simplified data management and automated critical processes using SQL querying and DML triggers. Our system stands as a testament to the potential of well-structured databases in enhancing operational efficiency in supply chain management.</p>
      
      <h3 className={styles.projectTitle}>Deep Learning Chess                       <a href="https://github.com/shaunthom/Deep-Learning-Chess-Prototype" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a></h3>
      
      <p>My deep learning model for chess, developed using Python and the Keras library, epitomizes the fusion of technology and strategy. This model predicts chess game outcomes with a remarkable 76% accuracy, providing players with a strategic edge. I optimized the model's predictive capabilities by incorporating a range of factors, including player form, opponent quality, and opening variations, sourced through sophisticated data scraping techniques. This analytical tool is a boon for chess enthusiasts and professionals alike, offering insights that help refine strategies and understand game dynamics better.</p>
      
      <h3 className={styles.projectTitle}>Remote-Reality: Data Visualization Website
      <a href="https://sites.google.com/view/shaunjay" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLink} />
      </a>
      </h3>
      <p>Remote-Reality, my data visualization website, showcases the advantages of remote work through engaging and interactive visual tools. Utilizing technologies like Plotly JavaScript, Python, and Microsoft PowerBI, I developed a series of interactive, downloadable graphs and charts. These visualizations effectively communicate key aspects of remote work, such as work preparation hours and other metrics, offering stakeholders a clear, data-driven perspective on the benefits of remote working environments. This project not only highlights the advantages of remote work but also encourages deeper analysis and understanding of work-life balance in the digital age.</p>
    </div>
  );
};

export default About;
