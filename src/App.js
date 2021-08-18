import './scss/app.scss';
import React, { useState} from "react";
import Navigation from "./components/navigation";
import Hero from "./components/hero";
import BannerTop from "./components/bannerTop";
import BannerBottom from "./components/bannerBottom";
import Footer from "./components/footer";

import "./mocks/post";
import { useForm } from "react-hook-form";



export default function App() {

  let [answer, setAnswer] = useState();
  let [checkBoxCheck, setCheboxCheck] = useState(true);

  const {
    register,
    reset,
    handleSubmit ,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true    
  })


  const handleReset = () =>{
    reset({
      firstName: "",
      lastName:"",
      email:"",
      org:"",
      euResident:"",
    })
  };


  const onSubmit = async (data) => {
    validateCheckbox();
    if(checkBoxCheck){
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data)
      };
      try {
        const res = await fetch("/api/sendForm", requestOptions)
        const json = await res.json();
        setAnswer(json.message);
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateCheckbox = () =>{
      const checkBoxes = document.querySelectorAll('input[type=checkbox]');
      let isChecked = false;
      for (var i = 0; i < checkBoxes.length; i++) {
          if ( checkBoxes[i].checked ) {
              isChecked = true;
          };
      };
      isChecked ? setCheboxCheck(true) : setCheboxCheck(false);
  }
  const checkboxes = ["advances", "alerts", "other communications"]

  return (
    <div className="App">
      <Navigation/>
      <Hero/>

      <div className="max-centered">
        <BannerTop/>
        <main role="main">
            
            👉 Your code goes here 👈
            
        </main>
       
        <BannerBottom/>
        <Footer/>
      </div>
    </div>
  );
}
