import React, { useState } from 'react'

export default () => {
  const [isOpen, setOpen] = useState(false)

  return <div>
    <nav className="p-3 border-b-2 flex items-center">
      <button
        className="icon icon-menu w-8 h-8"
        data-test="menu-button"
        onClick={() => setOpen(true)}
      />
      <span className="flex-grow font-bold text-xl text-center">TODO</span>
      <button className="rounded-full icon icon-profile bg-grey-light w-8 h-8" />
    </nav>

    <div
      className={`bg-shadow fixed pin ${isOpen ? '' : 'invisible'}`}
      data-test="side-menu"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-96 bg-white h-full shadow-lg"
        onClick={e => e.stopPropagation()}
      >

      </div>
    </div>
  </div>
}