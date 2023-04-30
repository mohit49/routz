import React from 'react'
import { Container } from 'react-bootstrap'
import '../Announcement/Announcement.scss'
import ContentSlider from '../../uiElements/ContentSlider/ContentSlider'
function Announcement() {
    const sliderItem = {
        slide1: {
            text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          cta: false,
          ctaLink: "#",
          ctaText: "",
          sliderHeading: "",
          sliderText: ``,
          className: "slider-con-inner",
          buttonVariant: "primary",
          btnSize: "md",
        },
        slide2: {
            text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          cta: false,
          ctaLink: "#",
          ctaText: "",
          sliderHeading: "",
          sliderText: ``,
          className: "slider-con-inner",
          buttonVariant: "primary",
          btnSize: "md",
        },
        slide3: {
            text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          cta: false,
          ctaLink: "#",
          ctaText: "",
          sliderHeading: "",
          sliderText: ``,
          className: "slider-con-inner",
          buttonVariant: "primary",
          btnSize: "md",
        },
      };
  return (
    <section className='announcement-container'>
    <Container>
     <h2>Announcements</h2>
     <ContentSlider
                effect='fade'
                autoPlay={true}
                items={sliderItem}
                dotPosition='bottom'
                buttonClass='primary'
                className='slider-home'
              />
     

     </Container> 
 </section>
  )
}

export default Announcement