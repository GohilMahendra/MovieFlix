import { render, screen } from "@testing-library/react-native"
import EmptyContainer from "../../../src/components/movies/EmptyContainer"

describe("Empty Container ...",()=>{
    beforeAll(()=>{
        render(<EmptyContainer/>)
    })

    it("It will render the empty component successfull",()=>{
        const parent_view = screen.getByTestId("container_empty")
        expect(parent_view).toBeDefined()
    })
})