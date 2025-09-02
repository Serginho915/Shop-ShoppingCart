const getData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      alert(`Error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    alert("Something went wrong while fetching data");
    return null;
  }
};

export default getData;