import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { pokemonRequest } from "../apiRequest";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useOutletContext();
  const [teachers, setTeachers]

  return (
  <div className="main-page-contents">
    <h2>Home</h2>
    <ol>
      {initialPokemon.map((poke, index) => (
        <li key={index}> <Link to={`/pokemon/${poke.name}`} >{poke.name}</Link></li>
      ))}
    </ol>
  </div>
  )
}