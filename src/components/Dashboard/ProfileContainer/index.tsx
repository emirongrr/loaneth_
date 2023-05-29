/*Current user ProfileContainer(user: user) */
const ProfileContainer = () =>
{
    return(
        <div className="w-full max-w-[960px] shadow-2xl rounded-[12px] mx-auto px-3.5 box-border block mt-4">
            <div className="h-6 w-auto"></div>
            <div className="grid grid-flow-col grid-cols-new gap-0 items-start flex justify-between box-border">
                <div className="grid grid-flow-col grid-cols-new gap-5 items-start justify-start">
                    <div className="rounded-2xl w-[104px] h-[104px] relative">
                        <img className="w-full h-full object-cover object-center block rounded-xl" src=''/>
                    </div>
                    <div className="grid gap-2 grid-cols-new p-0 m-0 box-border">
                        <div className="grid grid-flow-col auto-cols-new gap-1 items-center justify-start h-6">
                            <div className="block font-graphik text-20 leading-6 font-medium tracking-tighter text-current whitespace-nowrap">vitalik.eth</div>
                        </div>
                        <span>
                            <div className="grid gap-4 grid-cols-minmax-auto">
                                <div className="grid grid-flow-col auto-cols-new gap-4 items-center break-words justify-start text-4xl leading-12 ">$15,423,233</div>
                                <div className="block font-graphik text-base leading-5 font-medium tracking-tight {balances >= 0 ? 'text-green' : 'text-red-500'}" >%24</div>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="grid grid-flow-col auto-cols-new grid-cols-1fr gap-3 items-center justify-start">
                    <button className="bg-transparent border-none outline-none">iban</button>
                    <a className="text-black p-[7px] min-w-0 rounded-[50%] h-10 w-10">
                        <div className="grid grid-flow-col auto-cols-new gap-0 items-center justify-center">
                           <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.675 6.056c.784-.261 1.543.442 1.267 1.176l-4.558 12.15c-.31.824-1.559.824-1.87 0l-2.03-5.397-5.814-1.853a.905.905 0 01-.012-1.745l13.017-4.331z" fill="currentColor"></path></svg>
                        </div>
                    </a>

                </div>
            </div>
            <div className="h-2 w-auto"></div>


        </div>
    );
}

export default ProfileContainer