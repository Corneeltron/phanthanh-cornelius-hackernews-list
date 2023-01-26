import { HNStory } from "../components/HNStory";

export const getPaginationItems = (
  currentPage: number,
  lastPage: number,
  maxLength: number
) => {
  const res: number[] = [];

  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }
  } else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const minusMaxLength = maxLength - confirmedPagesCount;
    const sideLength = minusMaxLength / 2;

    // ellipsis in the middle
    if (
      ((currentPage - firstPage) < sideLength) ||
      ((lastPage - currentPage) < sideLength)
    ) {
      for (let j = firstPage; j <= firstPage + sideLength; j++) {
        res.push(j);
      }
      res.push(NaN)

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k);
      }
    }
    
    // ellipses not in middle
    else {
      const isNearFirstPage = (currentPage - firstPage) < (lastPage - currentPage);
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }
        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength -1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }
  return res;
};

export const paginate = (stories: HNStory[], pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return stories.slice(startIndex, startIndex + pageSize);
 };