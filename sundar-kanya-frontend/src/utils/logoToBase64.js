export const getLogoBase64 = async () => {
  const response = await fetch("/logo.png");
  const blob = await response.blob();

  return await new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);

    reader.readAsDataURL(blob);
  });
};