import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

function Api() {
  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const key = '_DYypp5C7IFUXJAOnlz_pcjBojoPnzafGoNwMc9iRl0';
  const inputRefs = useRef([]);
  const [textInputs, setTextInputs] = useState([]);

  async function getrandomimg() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${key}`);
    const data = await response.json();
    setImages2(data);
    console.log(data);
  }

  async function getimages() {
    try {
      const response = await fetch(`https://api.unsplash.com/photos?page=${currentPage}&client_id=${key}`);
      const data = await response.json();
      console.log(data);
      setImages1(data);
      setCurrentPage(currentPage + 5);
    } catch (err) {
      console.error('Error', err);
    }
  }

  useEffect(() => {
    getimages();
  }, []);

  const handleTextInputChange = (e, index) => {
    const updatedInputs = [...textInputs];
    updatedInputs[index] = e.target.value;
    setTextInputs(updatedInputs);
  };

  const handleAddTextInput = () => {
    setTextInputs([...textInputs, '']);
  };

  const handleDeleteTextInput = (index) => {
    const updatedInputs = [...textInputs];
    updatedInputs.splice(index, 1);
    setTextInputs(updatedInputs);
  };

  return (
    <div className="bg-gradient-to-tr from-white to-gray-300 p-4">
      <h1 className="text-center  text-4xl font-bold font-sans text-white p-4">ImAgiCa</h1>
      <button onClick={getrandomimg} className="bg-blue-500 text-xl h-14 w-36 m-4 rounded-lg font-semibold text-white">
        Generate
      </button>
      <div className="relative w-auto h-auto m-2 shadow-xl shadow-gray-600 rounded-sm">
        {images2 && (
          <div>
            <img className="relative w-full h-auto bg-cover" src={images2.urls.full} alt="Random Unsplash" />
            <div className="absolute w-full md:w-auto h-auto inset-0 text-center md:pt-[400px]">
              <div className="w-auto md:w-auto h-auto md:m-auto flex flex-wrap">
                {textInputs.map((text, index) => (
                  <Draggable key={index}>
                    <Resizable
                      width={5} // Adjust the multiplier as needed
                      height={5}
                      onResize={() => {}}
                    >
                      <div className="relative">
                        <input
                          className="bg-transparent text-white font-bold text-2xl p-3 w-full"
                          type="text"
                          placeholder="Enter text"
                          value={text}
                          onChange={(e) => handleTextInputChange(e, index)}
                          ref={(input) => (inputRefs.current[index] = input)}
                        />
                         <button
                        onClick={() => handleDeleteTextInput(index)}
                        className="w-auto h-auto bg-red font-semibold text-white"
                      >
                        X
                      </button>
                      </div>
                    </Resizable>
                  </Draggable>
                ))}
                <button onClick={handleAddTextInput} className="bg-green-500 text-xl text-white h-12 w-12">
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={getimages} className="bg-blue-500  text-lg h-12 w-[200px] md:text-xl m-4 items-center md:h-20 md:w-[200px] rounded-lg font-semibold text-white">
        Generate collection
      </button>
      <div className="flex flex-wrap gap-4 justify-center">
        {images1.map((item, id) => {
          return (
            <div key={id} className="flex flex-row justify-around h-auto w-[200px] md:w-[300px] shadow-xl shadow-gray-500">
              <img className="w-auto h-auto bg-cover" src={item.urls.small} alt="unsplash" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Api;
