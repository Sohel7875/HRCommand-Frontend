import { useState } from 'react';
import styles from './Testing.module.css'


const Cards = [
    {
      headerImage: "https://picsum.photos/400/200?random=1",
      CardHeading: "Learn JavaScript",
      CardParagraph: "Master the fundamentals of JavaScript, the language of the web."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=2",
      CardHeading: "Discover React",
      CardParagraph: "Explore the power of React for building dynamic user interfaces."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=3",
      CardHeading: "Node.js Basics",
      CardParagraph: "Get started with backend development using Node.js."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=4",
      CardHeading: "CSS Styling",
      CardParagraph: "Learn how to create visually appealing designs using CSS."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=5",
      CardHeading: "Responsive Design",
      CardParagraph: "Build websites that look great on all devices."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=6",
      CardHeading: "MongoDB Essentials",
      CardParagraph: "Understand the basics of MongoDB, a NoSQL database."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=7",
      CardHeading: "API Development",
      CardParagraph: "Learn to create robust APIs for your applications."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=8",
      CardHeading: "TypeScript Introduction",
      CardParagraph: "Get started with TypeScript for type-safe JavaScript development."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=9",
      CardHeading: "DevOps Practices",
      CardParagraph: "Explore the principles of DevOps for efficient software delivery."
    },
    {
      headerImage: "https://picsum.photos/400/200?random=10",
      CardHeading: "Git and GitHub",
      CardParagraph: "Master version control and collaboration with Git and GitHub."
    }
  ];
  
  



const Testing = () => {

  const [selectedValue,setSelectedValue] = useState('Option1')

  const handleRadioChange = (e) =>{
    setSelectedValue(e.target.value)
  }
    return (
        <div className={styles.cardsContainer}>
          <input type="checkbox"  onChange={(e) =>console.log(e.target.checked)}/>
          <label htmlFor="firstRadio">First Option</label>
          <input type="radio" id='firstRadio'  value={'Option1'} checked={selectedValue ==='Option1'} onChange={handleRadioChange}/>
          <label htmlFor="secondRadio">Second Option</label>
          <input type="radio" id='secondRadio' value={'Option2'} checked={selectedValue ==='Option2'} onChange={handleRadioChange}/>
            {/* {
                Cards?.length > 0 && Cards?.map((card, index) => (
                    <div key={index} className={styles.Cards}>
                        <img src={card?.headerImage} alt={card?.CardHeading} />
                        <h3>{card?.CardHeading}</h3>
                        <p>{card?.CardParagraph}</p>
                    </div>
                ))
            } */}
        </div>
    )
}

export default Testing