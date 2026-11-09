/**
 * The Eagle Nexa wordmark: "Eagle" in Fraunces 500, "Nexa" in Fraunces Italic 400 in crimson,
 * set the way the finalised name lockup is (tracking −0.035em, optical size follows the size).
 * `underline` adds the amber stroke under "Nexa" from the lockup; on the dark site the crimson
 * is lifted slightly so it stays legible.
 */
export default function Wordmark({ className = '', size = 'text-[19px]', underline = false }) {
  return (
    <span className={`font-brand ${size} whitespace-nowrap leading-none tracking-[-0.035em] text-white ${className}`}>
      <span className="font-medium">Eagle</span>{' '}
      <em className="relative font-normal italic text-[#c81e3a] dark:text-[#f43f5e]">
        Nexa
        {underline && (
          <span
            aria-hidden="true"
            className="absolute -bottom-[0.2em] left-[2%] right-[-2%] h-[0.09em] -rotate-1 rounded-full bg-[#f5b301] shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
          />
        )}
      </em>
    </span>
  )
}
