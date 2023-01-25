const getTopStoriesIds = jest.fn(() => {
  setTimeout(() => {
    Promise.resolve([ 34524749, 34521149, 34524006, 34523745, 34522311, 34524150 ])
  }, 3000)
});

export default getTopStoriesIds;