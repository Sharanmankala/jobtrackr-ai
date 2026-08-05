type FooterProps = {
  name: string;
  email: string;
};

function Footer({ name, email }: FooterProps) {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-28 pt-6 text-sm text-zinc-500 sm:px-6 xl:pb-14">
      <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>{name} portfolio</p>
        <p>{email}</p>
      </div>
    </footer>
  );
}

export default Footer;
