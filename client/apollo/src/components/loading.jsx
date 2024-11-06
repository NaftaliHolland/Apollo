import Logo from "@/assets/logo";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">
        <Logo height={70} width={70} />
      </div>
    </div>
  )
}

export default Loading;
