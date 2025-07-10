
const Footer = () => {
  return (
    <div className="text-center">
        <p className="text-sm text-SecondaryTextColor">
            &copy; {new Date().getFullYear()} LinkAuto. All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
            Made with ❤️ by the TechGuild
        </p>
    </div>
  )
}

export default Footer