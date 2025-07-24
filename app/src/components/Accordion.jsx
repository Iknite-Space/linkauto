import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// Move this above AccordionDemo
const AccordionItem = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <Accordion.Item
      className={classNames(
        "overflow-hidden border border-gray-200 rounded-md mb-2",
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </Accordion.Item>
  )
);
AccordionItem.displayName = "AccordionItem";
AccordionItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          "group flex h-[50px] flex-1 items-center justify-between px-5 text-base font-medium",
          "bg-primary text-whiteColor hover:bg-secondary transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-accent",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
        <ChevronDownIcon
          className="transition-transform duration-300 group-data-[state=open]:rotate-180 text-whiteColor"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";
AccordionTrigger.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, ref) => (
    <Accordion.Content
      className={classNames(
        "overflow-hidden bg-white text-gray-700 text-base text-left data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
        className
      )}
      {...props}
      ref={ref}
    >
      <div className="px-5 py-4 border-t border-gray-200">{children}</div>
    </Accordion.Content>
  )
);
AccordionContent.displayName = "AccordionContent";
AccordionContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Main component
const AccordionDemo = () => (
  <Accordion.Root
    className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-md"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It’s unstyled by default, giving you full control over the look and
        feel.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <AccordionContent>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

export default AccordionDemo;
