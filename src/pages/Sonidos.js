// src/pages/Sonidos.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

import audioHimno from "../Sounds/Himno_URSS.mp3";
import audioGta from "../Sounds/GTA_Mision.mp3";
import audioCabra from "../Sounds/Cabra_Gritando.mp3";
import audioNuclear from "../Sounds/Alerta_Nuclear.mp3";
import audioPedro from "../Sounds/Pedro_Piqueras.mp3";
import audioTit from "../Sounds/Titanic_flute.mp3";
import audioMatar from "../Sounds/Me_Matar.mp3";
import audioGadget from "../Sounds/Inspector_Gadget.mp3";
import audioExpediente from "../Sounds/Expediente_X.mp3";
import audioMartin from "../Sounds/Martín_Matin.mp3";
import audioPers from "../Sounds/persecución.mp3";
import audio50Cent from "../Sounds/50-Cent-In-Da-Club.mp3";
import rajoy_audio from "../Sounds/rajoy_meme.mp3";
import audioAtencione from "../Sounds/Attenzione.mp3";
import audioGato from "../Sounds/GatoHuh.mp3";
import audioPum from "../Sounds/PUM-Audio.mp3";

const sounds = [
  {
    id: "Nuclear_audio",
    label: "Alerta Nuclear",
    src: audioNuclear,
    imgSrc: "https://img.freepik.com/vector-premium/icono-peligro-radiacion-alerta-amenaza-radiactiva-simbolo-precaucion-nuclear_342166-429.jpg?w=2000",
  },
  {
    id: "Gta_audio",
    label: "GTA Mision Complete",
    src: audioGta,
    imgSrc: "https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fgrand-theft-auto-v%2Fhome%2FGTAV_EGS_Artwork_1920x1080_Hero-Carousel_V06-1920x1080-1503e4b1320d5652dd4f57466c8bcb79424b3fc0.jpg",
  },
  {
    id: "Cabra_audio",
    label: "Grito Cabra",
    src: audioCabra,
    imgSrc: "https://animapedia.org/wp-content/uploads/2019/07/cabra-1.jpg",
  },
  {
    id: "Himno_URSS_audio",
    label: "URSS",
    src: audioHimno,
    imgSrc: "https://okdiario.com/img/2022/02/24/-que-paises-formaron-parte-de-la-urss_.jpg",
  },
  {
    id: "Pedro_Piqueras_audio",
    label: "Pedro Piqueras",
    src: audioPedro,
    imgSrc: "https://images.ecestaticos.com/c4hpdnLzRo8r-38mIYxZNVdheGk=/0x0:1481x843/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fa2a%2F41c%2Ff55%2Fa2a41cf555c504efd8b2be886bcf93ee.jpg",
  },
  {
    id: "Titanic_audio",
    label: "Titanic",
    src: audioTit,
    imgSrc: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic762774.jpg?w=1600&h=900",
  },
  {
    id: "Matar_audio",
    label: "Me voy a matar",
    src: audioMatar,
    imgSrc: "https://i.ytimg.com/vi/Gotz1iO_w4E/maxresdefault.jpg",
  },
  {
    id: "Inspector_Gadget_audio",
    label: "Inspector Gadget",
    src: audioGadget,
    imgSrc: "https://i1.wp.com/clipset.com/wp-content/uploads/2013/10/gadget.jpg?ssl=1",
  },
  {
    id: "Expediente_audio",
    label: "Expediente X",
    src: audioExpediente,
    imgSrc: "https://pics.filmaffinity.com/Expediente_X_Serie_de_TV-450691206-large.jpg",
  },
  {
    id: "Martin_audio",
    label: "Martin Martin",
    src: audioMartin,
    imgSrc: "http://1.bp.blogspot.com/-b4doarIZ2xM/U1PEG-G2bNI/AAAAAAAA4Vk/ey4TH2aj1Sg/s1600/martin10.jpg",
  },
  {
    id: "Persecucion_audio",
    label: "Persecución",
    src: audioPers,
    imgSrc: "https://www3.gobiernodecanarias.org/medusa/proyectos/proyectonewton/wp-content/uploads/sites/20/2018/12/males-2512006_640.jpg",
  },
  {
    id: "50Cent_audio",
    label: "50 Cent",
    src: audio50Cent,
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8ecPdGItJrQOe-ThKpLkDAGG0E87dRs6ew&s",
  },
  {
    id: "Rajoy_audio",
    label: "Rajoy",
    src: rajoy_audio,
    imgSrc: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2017/06/15/14975454677947.jpg",
  },
  {
    id: "Atencione_audio",
    label: "Atencione!",
    src: audioAtencione,
    imgSrc: "https://i1.sndcdn.com/artworks-9FEfDz0gEWzbIcgc-ZfrGnQ-t500x500.jpg",
  },
  {
    id: "GatoHuh_audio",
    label: "Gato Huh",
    src: audioGato,
    imgSrc: "https://memeviral.com.mx/wp-content/uploads/2023/12/plantilla.png",
  },
  {
    id: "PUM_audio",
    label: "PUM!!!",
    src: audioPum,
    imgSrc: "https://www.formulatv.com/images/videos/19000/19526_658697fc59-t.jpg",
  },
];

function Sonidos() {
  const playSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.play();
  };

  const pauseSound = (audioId) => {
    const audioElement = document.getElementById(audioId);
    audioElement.pause();
  };

  return (
    <div className="haha">
      <div className="container_cards">
        {sounds.map((sound) => (
          <div key={sound.id} className="card">
            <img
              src={sound.imgSrc}
              onClick={() => playSound(sound.id)}
              alt={`Play ${sound.label}`}
              className="img_card"
            />
            <audio id={sound.id} src={sound.src}></audio>
            <p>{sound.label}</p>
            <button onClick={() => pauseSound(sound.id)}>Stop</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sonidos;
