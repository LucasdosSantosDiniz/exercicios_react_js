import { forwardRef, useImperativeHandle, useRef } from "react";

const SomeComponent = forwardRef((props, ref) => {
  const localInputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      validate: () => {
        if (localInputRef.current.validate.length > 3) {
          localInputRef.current.validate = "";
        }
      },
    };
  });

  return (
    <div>
      <input type="text" ref={localInputRef} />
    </div>
  );
});

export default SomeComponent;
