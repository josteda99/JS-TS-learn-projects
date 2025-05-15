import { EVENTS } from "./const";

export function navigate(href) {
  window.history.pushState({}, "", href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEVent = event.button === 0;
    const isModifiedEvent = event.metaKey || event.altkey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEVent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props}></a>;
}
