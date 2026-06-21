(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/questions/adaptive?difficulty=3');
    const data1 = await res.json();
    console.log("FIRST:", data1);
    const id1 = data1._id;
    
    const res2 = await fetch(`http://localhost:5000/api/questions/adaptive?difficulty=4&excludeIds=${id1}`);
    const data2 = await res2.json();
    console.log("SECOND:", data2);
    const id2 = data2 ? data2._id : 'none';
    
    const res3 = await fetch(`http://localhost:5000/api/questions/adaptive?difficulty=3&excludeIds=${id1},${id2}`);
    const data3 = await res3.json();
    console.log("THIRD:", data3);
  } catch(e) {
    console.error(e.message);
  }
})();
