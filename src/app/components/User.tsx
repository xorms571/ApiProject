import React from 'react';

const User = () => {
  return (
    <form className='user w-1/5'>
      <input type="text" placeholder='아이디' />
      <input type="text" placeholder='비밀번호' />
      <button>로그인</button>
      <button>회원가입</button>
    </form>
  );
};

export default User;