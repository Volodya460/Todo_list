import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { TodoElement } from '../todoElement/todoElement';
import { DivButton } from './swiper.styles';

export function SwiperTodos({ todos }): JSX.Element {
	return (
		<>
			<DivButton>
				{' '}
				<button type="button" className="prev">
					Prev
				</button>
				<button type="button" className="next">
					Next
				</button>
			</DivButton>

			<Swiper
				direction="horizontal"
				loop={todos.length > 1}
				spaceBetween={0}
				slidesPerView={1}
				centeredSlides={true}
				mousewheel={true}
				modules={[Mousewheel, Pagination, Navigation]}
				navigation={{
					nextEl: '.next',
					prevEl: '.prev',
				}}
				css-mode="true"
			>
				{todos.map((el) => {
					return (
						<SwiperSlide key={el.id}>
							<TodoElement
								key={el.id}
								id={el.id}
								title={el.title}
								description={el.description}
								completed={el.completed}
								isPublic={el.isPublic}
								ownerId={el.ownerId}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
}
