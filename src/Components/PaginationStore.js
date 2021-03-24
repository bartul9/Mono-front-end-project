import { observable } from "mobx";

class PaginationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      currentPage: 1,
      postsPerPage: 8,
      pageNumbers: [],
      showAll: false,
    });
  }

  countItems = (items) => {
    if (!this.storeData.pageNumbers[0] && items.length > 8) {
      for (
        let i = 1;
        i <= Math.ceil(items.length / this.storeData.postsPerPage);
        i++
      ) {
        this.storeData.pageNumbers.push(i);
      }
    }

    const indexOfLastPost =
      this.storeData.currentPage * this.storeData.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.storeData.postsPerPage;

    return items.slice(indexOfFirstPost, indexOfLastPost);
  };

  // Paggination functionality

  paginate = (pageNum) => (this.storeData.currentPage = pageNum);

  nextPage = () =>
    (this.storeData.currentPage = this.storeData.currentPage + 1);

  prevPage = () =>
    (this.storeData.currentPage = this.storeData.currentPage - 1);
}

export default PaginationStore;
