interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2620px] mx-auto xl:px-14 md:px-8">{children}</div>
  );
};

export default Container;
