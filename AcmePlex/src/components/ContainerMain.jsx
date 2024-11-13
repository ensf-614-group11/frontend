
function ContainerMain({children}) {
  return(
    <main className="flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-10 mb-10">
      <div className="bg-neutral-200 rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-lg lg:max-w-2xl xl:max-w-3xl space-y-6 border border-neutral-300">
        {children}
      </div>
    </main>
  );
}

export default ContainerMain