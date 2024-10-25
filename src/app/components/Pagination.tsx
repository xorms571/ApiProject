type PaginationProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  loadMoreItems: () => void;
  hasMore: boolean;
  loading: boolean;
};

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  loadMoreItems,
  hasMore,
  loading,
}: PaginationProps) => {
  const pageNumbers = [];
  const maxPageDisplay = 3; // 화면에 표시할 최대 페이지 번호 개수

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 현재 페이지 번호의 그룹 설정 (currentPage에 맞는 범위 계산)
  let startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
  const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

  // 만약 끝 페이지가 마지막 페이지보다 작을 경우, 시작 페이지 조정
  if (endPage - startPage < maxPageDisplay - 1) {
    startPage = Math.max(1, endPage - maxPageDisplay + 1);
  }

  // 페이지 번호 배열 생성
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center gap-1 items-center">
        {/* 첫 페이지 버튼 */}
        <li>
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="ml-0 border px-2"
          >
            &lt;&lt;
          </button>
        </li>

        {/* 이전 페이지 버튼 */}
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="ml-0 mr-2 border px-2"
          >
            &lt;
          </button>
        </li>

        {/* 페이지 번호 표시 */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`text-base ml-0 bg-transparent shadow-none px-2 font-normal ${
                currentPage === number ? "font-extrabold underline" : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* "더 보기" 버튼 - 페이지네이션과 별도 */}
        {hasMore && !loading && (
          <div>
            <button className="ml-2 border px-2" onClick={loadMoreItems}>
              &gt;
            </button>
          </div>
        )}

        {/* 마지막 페이지 버튼 */}
        <li>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="ml-0 border px-2"
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
