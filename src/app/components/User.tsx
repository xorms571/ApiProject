type UserProps = {
  windowWidth:number
}
const User = ({windowWidth}:UserProps) => {
  return (
    <form className={`user w-full h-fit ${windowWidth > 1200 ? "bg-stone-100":"bg-stone-50"} border rounded-lg p-3 flex flex-col gap-2 items-end text-sm`}>
      <input className='w-full border rounded-md py-1 px-2 h-7' type="text" placeholder='아이디' />
      <input className='w-full border rounded-md py-1 px-2 h-7' type="text" placeholder='비밀번호' />
      <div className='flex gap-3'>
        <button className='border rounded-md bg-stone-50 px-4 text-xs py-1'>로그인</button>
        <button className='border rounded-md bg-stone-50 px-4 text-xs py-1'>회원가입</button>
      </div>
    </form>
  );
};

export default User;