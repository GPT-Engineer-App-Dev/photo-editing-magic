import { useState } from 'react';
import { Box, Button, Image, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';

const Index = () => {
  const [image, setImage] = useState('');
  const [filter, setFilter] = useState({
    grayscale: 0,
    sepia: 0,
    brightness: 100
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const applyFilter = () => {
    return `grayscale(${filter.grayscale}%) sepia(${filter.sepia}%) brightness(${filter.brightness}%)`;
  };

  const downloadImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = applyFilter();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'edited-image.png';
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl">Simple Image Editor</Text>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <>
            <Image src={image} alt="Uploaded" style={{ filter: applyFilter() }} maxWidth="90vw" maxHeight="60vh" />
            <Slider aria-label="grayscale-slider" defaultValue={0} min={0} max={100} onChange={(val) => setFilter({ ...filter, grayscale: val })}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Slider aria-label="sepia-slider" defaultValue={0} min={0} max={100} onChange={(val) => setFilter({ ...filter, sepia: val })}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Slider aria-label="brightness-slider" defaultValue={100} min={50} max={150} onChange={(val) => setFilter({ ...filter, brightness: val })}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Button onClick={downloadImage}>Download Edited Image</Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;