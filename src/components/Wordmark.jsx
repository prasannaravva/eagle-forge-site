/**
 * The Eagle Nexa wordmark: "Eagle" in Fraunces 500, "Nexa" in Fraunces Italic 400 in crimson,
 * set the way the finalised name lockup is (tracking −0.035em, optical size follows the size).
 * On the dark site the crimson is lifted slightly so it stays legible.
 */
export default function Wordmark({ className = '', size = 'text-[19px]' }) {
  return (
    <span className={`font-brand ${size} leading-none tracking-[-0.035em] text-white ${className}`}>
      <span className="font-medium">Eagle</span> <em className="font-normal italic text-[#f43f5e]">Nexa</em>
    </span>
  )
}
