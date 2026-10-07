/*
 * art.mrzzy.co
 * UI components
 * Gallery
 */

"use client";

import { Art } from "@/lib/models";
import Thumbnail from "./thumbnail";
import ZoomView from "./zoom";
import {
  usePathname,
  useSearchParams,
  useRouter,
  notFound,
} from "next/navigation";
import { Fragment } from "react";
import { Param } from "../navigation/params";
import { paginate } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

/**
 * Renders pagination links for a paginated list, showing at most 5 links: the
 * first 4 pages and the last page, an ellipsis indicates any middle pages
 * omitted. Renders nothing if there is only one page.
 * @param props.count Total number of pages.
 * @param props.page Current page number (0-indexed).
 * @param props.pathname Path pagination links point to.
 * @param props.onClick Callback invoked with the page number on link click.
 */
function Pages(props: {
  count: number;
  page: number;
  pathname: string;
  onClick: (n: number) => void;
}) {
  if (props.count <= 1) {
    return <></>;
  }

  // page links to render: at most 5, showing the first 4 pages and the last
  // page, an ellipsis indicates any middle pages omitted
  const maxLinks = 5;
  
  
  // chunk links into first 4, last 1 chunks if there are more than maxLinks pages
  const links: number[] =
    props.count <= maxLinks
      ? [...Array(props.count).keys()]
      : [...Array(maxLinks - 1).keys(), props.count - 1];

  const href = (n: number) => `${props.pathname}?${Param.Page}=${n}`;
  const goTo = (n: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    props.onClick(n);
  };

  return (
    <Pagination>
      <PaginationContent>
        {props.page > 0 ? (
          <PaginationItem>
            <PaginationPrevious
              href={href(props.page - 1)}
              onClick={goTo(props.page - 1)}
            />
          </PaginationItem>
        ) : (
          <></>
        )}
        {links.map((n, i) => (
          <Fragment key={n}>
            {i > 0 && n - links[i - 1] > 1 ? (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <></>
            )}
            <PaginationItem>
              <PaginationLink
                href={href(n)}
                isActive={n === props.page}
                onClick={goTo(n)}
              >
                {n + 1}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}
        {props.page < props.count - 1 ? (
          <PaginationItem>
            <PaginationNext
              href={href(props.page + 1)}
              onClick={goTo(props.page + 1)}
            />
          </PaginationItem>
        ) : (
          <></>
        )}
      </PaginationContent>
    </Pagination>
  );
}

/**
 * Renders a scrollable gallery of thumbnail images of art pieces.
 * Displays a modal zoom view of an art piece if url parameter 'view=<ID>'
 * is set to id of the piece to show.
 * @param props.pieces List of Art pieces to render in the Art gallery.
 */
export default function Gallery(props: { pieces: Art[] }) {
  const params = useSearchParams();

  // gallery of thumbnail art pieces
  const [router, pathname] = [useRouter(), usePathname()];
  const images = props.pieces.map((art) => (
    <Thumbnail
      art={art}
      key={art.id}
      onClick={() => {
        // show piece on thumbnail click
        router.push(`${pathname}?${Param.View}=${art.id}`);
      }}
    />
  ));

  // chunk pieces into pages to avoid showing all pieces at once causing slow load times
  const pages = paginate(images, 10);
  const page = Number.parseInt(params.get(Param.Page) || "0");
  if (page >= pages.length) {
    notFound();
  }

  // show piece if set in 'view' url parameter
  const selected = props.pieces.find(({ id }) => id === params.get(Param.View));

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 m-8 items-stretch">
        {pages[page]}
      </section>

      <Pages
        count={pages.length}
        page={page}
        pathname={pathname}
        onClick={(n) => {
          router.push(`${pathname}?${Param.Page}=${n}`);
        }}
      />

      {selected != null ? (
        <ZoomView
          art={selected}
          onClose={() => {
            router.back();
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
