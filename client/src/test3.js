const rdata = {
  reviews: [
    {
      content: "Good one!",
      username: "Raymond",
    },
  ],
  ratings: [
    {
      value: 4,
      username: "Raymond",
    },
  ],
};
function addingReviewRating(reviews, ratings) {
   const data =[] 
    
  for (let i = 0; i < reviews.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (reviews[i].username == ratings[j].username) {

        data.push({review: reviews[i].content, rating: ratings[j].value , username: reviews[i].username})
        
      }
    }
  }
  
  return data;
}
console.log(addingReviewRating(rdata.reviews,rdata.ratings))