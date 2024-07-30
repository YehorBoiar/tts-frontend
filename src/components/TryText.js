import React, { useState } from 'react';
import PlayAudioButton from './PlayAudioButton';

const TryText = () => {
  const standardText = "Cheese, a beloved dairy product, has been an integral part of human cuisine for millennia. Its origins can be traced back to ancient civilizations, where early cheese-making techniques were developed to preserve milk. This versatile food comes in a myriad of varieties, each with unique flavors, textures, and aromas. From the sharp tang of aged cheddar to the creamy smoothness of brie, cheese offers a sensory experience that delights palates around the world.";
  const [text, setText] = useState(standardText);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (text === standardText) {
      setText('');
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (text === '') {
      setText(standardText);
    }
    setIsFocused(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[800px] h-[600px] p-4 rounded bg-white">
        <textarea
          className={`w-full h-full p-2 border rounded ${!isFocused && text === standardText ? 'text-gray-400' : 'text-black'}`}
          value={text}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      <div>
        <PlayAudioButton text={text} bookPath={"cheese"} />
      </div>
    </div>
  );
};

export default TryText;
